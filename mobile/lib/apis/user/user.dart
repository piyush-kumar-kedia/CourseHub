import 'dart:convert';
import '../../models/user.dart';
import 'package:hive_flutter/adapters.dart';
import '../endpoints.dart';
import 'package:http/http.dart' as http;

import '../protected.dart';

Future<void> getCurrentUser() async {
  final box = await Hive.openBox('coursehub-data');
  final header = await getAccessToken();
  print(header);
  final resp = await http.get(
    Uri.parse(UserEndpoints.currentUser),
    headers: {"Authorization": header},
  );

   

  final body = jsonDecode(resp.body);

  final user = User.fromJson(body);



  box.put('name', body);
  box.put('name', 'jjh');

  print('Name: ${box.get('name')}');
  print('hehe');




}
