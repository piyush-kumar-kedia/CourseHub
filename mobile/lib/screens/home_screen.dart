import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:test1/widgets/course_card.dart';

import '../models/course.dart';
import '../util/api/course_api.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.black,
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 0.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  SizedBox(
                    width: 26.0,
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Welcome,",
                          style: TextStyle(
                            fontSize: 20.0,
                            fontFamily: "ProximaNova",
                            fontWeight: FontWeight.w400,
                            color: Colors.white,
                          ),
                        ),
                        Text(
                          "Atharva Tagalpallewar",
                          style: TextStyle(
                            fontSize: 20.0,
                            fontFamily: "ProximaNova",
                            fontWeight: FontWeight.w700,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SvgPicture.asset("assets/home_books.svg"),
                ],
              ),
              SizedBox(
                height: 26.0,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 26.0),
                child: Text(
                  "MY COURSES",
                  style: TextStyle(
                    fontSize: 16.0,
                    fontFamily: "ProximaNova",
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 26.0),
                child: Expanded(
                  child: FutureBuilder<List<Course>>(
                    future: CourseApiClient.getAllCourses(),
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return Center(child: CircularProgressIndicator());
                      }
                      List<Course> courses = snapshot.data!;
                      return Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 0.0, vertical: 19.0),
                        child: GridView.count(
                          crossAxisCount: 2,
                          crossAxisSpacing: 23.0,
                          mainAxisSpacing: 16.0,
                          childAspectRatio: 1.25,
                          shrinkWrap: true,
                          children: courses.map((e) {
                            return CourseCard(course: e);
                          }).toList(),
                        ),
                      );
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
