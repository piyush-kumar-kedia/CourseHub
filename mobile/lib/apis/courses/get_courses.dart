import 'dart:convert';
import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;
import 'package:CourseHub/constants/endpoints.dart';

Future<void> getUserCourses(String code) async {
  try {
    final response =
        await http.get(Uri.parse('${CoursesEndpoints.course}$code/'));
    if (response.statusCode == 200) {
      var decodedResponse = jsonDecode(response.body);

      var box = await Hive.openBox('coursehub-data');
      Map<String, dynamic> data = box.get('courses-data') ?? {};
      if (decodedResponse['found'] == true) {
        data[code.toLowerCase()] = decodedResponse;
      } else {
        data[code.toLowerCase()] = 'unavailable';
      }
      box.put('courses-data', data);
    } else {
      throw ('error');
    }
  } catch (e) {
    rethrow;
  }
}
