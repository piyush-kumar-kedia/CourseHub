import 'package:flutter/material.dart';
import 'package:test1/models/course_model.dart';

class CourseCard extends StatelessWidget {
  final Course course;
  const CourseCard({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color(0xFFDBCEFF),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              color: Color(0xFF000000),
              child: Padding(
                padding: const EdgeInsets.all(6.0),
                child: Text(
                  course.code,
                  style: TextStyle(
                      fontFamily: 'ProximaNova',
                      fontSize: 14.0,
                      fontWeight: FontWeight.w700,
                      color: Colors.white),
                ),
              ),
            ),
          ),
          Spacer(),
          Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                course.name,
                style: TextStyle(
                  fontFamily: "ProximaNova",
                  fontWeight: FontWeight.w700,
                  color: Colors.black,
                  fontSize: 18.0,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
