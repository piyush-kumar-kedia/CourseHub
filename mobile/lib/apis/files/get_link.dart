import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:CourseHub/apis/protected.dart';
import 'package:CourseHub/constants/endpoints.dart';

Future<String> getPreviewLink(String id) async {
  final token = await getAccessToken();
  if (token == 'error') {
    throw ('e');
  }
  try {
    final res = await http.get(
      Uri.parse('${FileEndpoints.preview}$id'),
      headers: {"Authorization": token},
    );

    return jsonDecode(res.body)['url'];
  } catch (e) {
    rethrow;
  }
}
