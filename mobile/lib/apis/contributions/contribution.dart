import 'dart:convert';

import 'package:hive/hive.dart';
import 'package:http/http.dart' as http;
import 'package:test1/apis/protected.dart';
import 'package:test1/constants/endpoints.dart';

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
