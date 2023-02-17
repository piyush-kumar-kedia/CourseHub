import 'package:flutter/material.dart';
import 'package:test1/widgets/course_card.dart';

import '../models/course.dart';
import '../util/api/course_api.dart';

class GuestScreen extends StatelessWidget {
  final String courses;
  const GuestScreen({super.key, required this.courses});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: FutureBuilder<List<Course>>(
        future: CourseApiClient.getAllCourses(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return CircularProgressIndicator();
          }
          List<Course> courses = snapshot.data!;
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 26.0, vertical: 19.0),
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
        }
      ),
    );
  }

}