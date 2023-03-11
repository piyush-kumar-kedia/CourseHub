import 'dart:convert';
import 'dart:io';

import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;

import '../../constants/endpoints.dart';
import '../../database/hive_store.dart';
import '../../models/user.dart';
import '../authentication/login.dart';
import '../protected.dart';


Future<void> getContribution() async {
  final token = await getAccessToken();
  if (token == 'error') {
    throw ('e');
  } else {
    final res = await http.get(
      Uri.parse(MiscellaneousEndpoints.contributionList),
      headers: {"Authorization": token},
    );


    final body = jsonDecode(res.body);
  

    final box = await Hive.openBox('coursehub-data');
    box.put('contribution', body);
  }
}

Future<void> contributeData(File? file, String year, String courseCode,
    String folder, String description) async {
  final token = await getAccessToken();
  if (token == 'error') {
    throw ('e');
  } else {
    try {
      User user = HiveStore.getUserDetails();
      final request = http.MultipartRequest(
          "POST", Uri.parse(ContributionEndpoints.fileUpload));
      request.fields['contributionId'] = user.rollNumber.toString();
      request.fields['year'] = year;
      request.fields['uploadedBy'] = user.id;
      request.fields['courseCode'] = courseCode.toLowerCase();
      request.fields['folder'] = folder;
      request.fields['description'] = description;
      request.headers['authorization'] = token;

      http.MultipartFile multipartFile =
          await http.MultipartFile.fromPath('files', file!.path);
      request.files.add(multipartFile);

      final response = await request.send();

      final res = await http.Response.fromStream(response);
      if (res.statusCode == 200) {
        await getContribution();
        await setHiveStore();
      } else {
        throw ("e");
      }
    } catch (e) {
      rethrow;
    }
  }
}
