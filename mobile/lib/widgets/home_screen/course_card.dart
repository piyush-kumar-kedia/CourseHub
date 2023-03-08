import 'dart:math';

import 'package:flutter/material.dart';
import 'package:CourseHub/apis/courses/course_availability.dart';
import 'package:CourseHub/constants/themes.dart';
import 'package:CourseHub/controllers/letter_capitalizer.dart';
import 'package:CourseHub/models/course.dart';

class CourseCard extends StatelessWidget {
  final Course course;
  const CourseCard({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
        future: isCourseAvailable(course.code),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return AvailableCard(
              course: course,
              isAvailable: snapshot.data ?? false,
            );
          } else {
            return AvailableCard(
              course: course,
              isAvailable: false,
            );
          }
        });
  }
}

class AvailableCard extends StatelessWidget {
  final Course course;
  final bool isAvailable;
  const AvailableCard(
      {super.key, required this.course, required this.isAvailable});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: isAvailable
          ? colors[Random().nextInt(7)]
          : const Color.fromRGBO(99, 99, 99, 1),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  color: Colors.black,
                  child: Padding(
                    padding: const EdgeInsets.all(6.0),
                    child: Text(
                      course.code.toUpperCase(),
                      style: Themes.theme.textTheme.labelSmall,
                    ),
                  ),
                ),
                Visibility(
                  visible: !isAvailable,
                  child: Text(
                    'UNAVAILABLE',
                    style: Themes.darkTextTheme.labelSmall,
                  ),
                )
              ],
            ),
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              letterCapitalizer(course.name),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: Themes.darkTextTheme.displayMedium,
            ),
          ),
        ],
      ),
    );
  }
}
