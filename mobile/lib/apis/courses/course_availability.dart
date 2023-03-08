import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:CourseHub/constants/endpoints.dart';

Future<bool> isCourseAvailable(String coursecode) async {
  try {
    final res =
        await http.get(Uri.parse('${CoursesEndpoints.course}$coursecode'));

    final result = jsonDecode(res.body);

    if (result['found']) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    rethrow;
  }
}
