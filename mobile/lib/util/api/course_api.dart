import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:test1/util/endpoints/course_endpoints.dart';

import '../../models/course.dart';

class CourseApiClient {
  CourseApiClient._();

  static Future<List<Course>> getAllCourses() async {
    http.Response? response;
    List<Course> courses = [];

    try {
      response = await http.get(
        Uri.parse(CourseEndPoints.allCourses),
      );
      if (response.statusCode == 200) {
        var decodedResponse = jsonDecode(response.body);
        for (var c in decodedResponse) {
          courses.add(Course.fromJson(c));
        }
      }
    } catch (e) {
      print(e);
    }
    return courses;
  }

  static Future<Map<String, dynamic>> getCourseDetail(String code) async {
    http.Response? response;
    Map<String, dynamic> m = {};

    try {
      response = await http.get(
        Uri.parse('${CourseEndPoints.allCourses}$code/'),
      );
      if (response.statusCode == 200) {
        var decodedResponse = jsonDecode(response.body);
        m = decodedResponse as Map<String, dynamic>;
      }
    } catch (e) {
      print(e);
    }
    return m;
  }
}