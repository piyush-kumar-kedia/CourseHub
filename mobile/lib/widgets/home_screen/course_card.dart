import 'package:flutter/material.dart';
import 'package:test1/apis/courses/course_availability.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/models/course.dart';

extension HexColor on Color {
  /// String is in the format "aabbcc" or "ffaabbcc" with an optional leading "#".
  static Color fromHex(String hexString) {
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
    buffer.write(hexString.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }

  /// Prefixes a hash sign if [leadingHashSign] is set to `true` (default is `true`).
  String toHex({bool leadingHashSign = true}) => '${leadingHashSign ? '#' : ''}'
      '${alpha.toRadixString(16).padLeft(2, '0')}'
      '${red.toRadixString(16).padLeft(2, '0')}'
      '${green.toRadixString(16).padLeft(2, '0')}'
      '${blue.toRadixString(16).padLeft(2, '0')}';
}

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
      color:
          HexColor.fromHex(isAvailable ? course.color ?? '#FFA7D4' : '#636363'),
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
                      course.code,
                      style: Themes.theme.textTheme.labelSmall,
                    ),
                  ),
                ),
                Visibility(
                  visible: !isAvailable,
                  child:  Text('UNAVAILABLE',style: Themes.darkTextTheme.labelSmall,),
                )
              ],
            ),
          ),
          const Spacer(),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              course.name,
              maxLines: 3,
              overflow: TextOverflow.ellipsis,
              style: Themes.darkTextTheme.displayMedium,
            ),
          ),
        ],
      ),
    );
  }
}
