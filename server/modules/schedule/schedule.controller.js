import mongoose from "mongoose";
import Schedule from "./schedule.model.js";


class scheduleController{
    async getSchedule(req,res,next){
        const userCourses=req.user.courses;
        const days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
        const date=new Date(req.params.date);

        const day=days[date.getDay()]

        const startOfDay = new Date(date.toISOString().slice(0,10));
        const endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2, 0, 0, 0, 0);
        const endOfDay=new Date(endTime.toISOString().slice(0,10));

        const schedules=await Schedule.find({$or:[
            {$and:[
                {day},
                {
                    datesCancelled: {
                      $nin: [startOfDay]
                    }
                }
            ]},
            {
                classAdded: {
                  $elemMatch: {
                    startDateTime: {
                      $gte: startOfDay,
                      $lt: endOfDay
                    }
                  }
                }
              }
        ]}).select('classDetails classAdded -_id').populate({
            path: 'course',
            match: {
                code: {
                  $in: userCourses.map(course => course.code.toLowerCase()),
                },
            },
            select: 'code -_id',
          });

        const filteredSchedules = schedules.filter(schedule => schedule.course);

        const schedulesWithUserCourses = filteredSchedules.map(schedule => {
            const userCourse = userCourses.find(course => course.code === schedule.course.code.toUpperCase());
            const { course, ...scheduleWithoutCourse } = schedule.toObject();
            const filteredClassAdded = schedule.classAdded.filter(classInfo => {
                const classDate = new Date(classInfo.startDateTime);
                return classDate >= startOfDay && classDate < endOfDay;
              });
            return {
              ...scheduleWithoutCourse ,
              userCourse,
              classAdded: filteredClassAdded,
            };
          })

        res.status(200).json(schedulesWithUserCourses);

        
    }

    async createSchedule(req,res,next){
        const data=req.body;

        const classDetails={
            startDateTime:data.startDateTime,
            endDateTime:data.endDateTime,
            professor:data.professor,
            location:data.classLocation,
        };

        const schedule=new Schedule({
            course:data.course,
            classDetails,
            day:data.day,
        })
        await schedule.save();
        res.status(200).json(schedule);
    }

    async addClass(req,res,next){
        const {day,course,classDetails}=req.body;

        if(!day || !course) return res.sendStatus(400);

        const existingSchedule=await Schedule.findOne({day,course:mongoose.Types.ObjectId(course)});

        if(!existingSchedule) res.sendStatus(400);

        existingSchedule.classAdded.push(classDetails)

        const updatedSchedule=await existingSchedule.save()

        res.json(updatedSchedule);
        
    }


    async updateSchedule(req,res,next){

        const {day,course}=req.body;

        if(!day || !course) return res.sendStatus(400);

        const existingSchedule=await Schedule.findOne({day,course:mongoose.Types.ObjectId(course)});

        if(!existingSchedule) res.sendStatus(400);

        const updateObj={};

        for(let key in req.body){
            updateObj[key]=req.body[key];
        }

        const updatedSchedule=await existingSchedule.updateOne({$set:updateObj},{new:true});

        res.status(200).json(updatedSchedule);

    }

    async subscribeNotification(req,res,next){
        const data=req.body;
        if(!data.day || !data.course) return res.sendStatus(400);
        const day=data.day;
        const course=data.course;
        const schedule=await Schedule.findOne({day,course});

        if(!schedule) res.sendStatus(400);

        schedule.notificationSubscribed.push(req.user._id);

        const updatedSchedule=await schedule.save();

        res.status(200).json(updatedSchedule);
    }

    async datesCancelled(req,res,next){
        const data=req.body;
        if(!data.day || !data.course) return res.sendStatus(400);
        const day=data.day;
        const course=data.course;
        const schedule=await Schedule.findOne({day,course});

        if(!schedule) res.sendStatus(400);

        schedule.datesCancelled.push(data.dateCancelled);
        const updatedSchedule=await schedule.save();
        res.status(200).json(updatedSchedule);

    }

}

export default  new scheduleController();