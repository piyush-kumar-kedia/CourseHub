import 'dart:convert';
import 'package:hive/hive.dart';
import 'package:test1/widgets/custom_snackbar.dart';
import '../endpoints.dart';
import 'package:http/http.dart' as http;

import '../protected.dart';

Future<void> getCurrentUser() async {
  final header = await getAccessToken();

  if (header == 'error') {
    showSnackBar('Somethin Went Wrong');
    return;
  }

  try {
    final resp = await http.get(
      Uri.parse(UserEndpoints.currentUser),
      headers: {"Authorization": header},
    );

    final body = jsonDecode(resp.body);

    var box = await Hive.openBox('coursehub-data');


    box.put('user', body);

    print(box.get('user'));
  } catch (e) {
    print(e.toString());
    showSnackBar('Somethin Went Wrong');
  }
}
