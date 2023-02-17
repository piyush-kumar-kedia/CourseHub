import 'dart:convert';

import 'package:cryptography/cryptography.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:encrypt/encrypt.dart';
import 'dart:convert';
import 'dart:typed_data';

const baseUrl = 'https://www.coursehubiitg.in';
const access_token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNlZWZjYmM1OGNlNTFlODQ4ZGUwYjRlIiwiaWF0IjoxNjc2NjQxOTYyLCJleHAiOjE2NzY2NDU1NjJ9.Mz7G-IDRClAjDjgzkd6kM7DWBcSJY0SGewseLC4ls_g';

// Uint8List convertStringToUint8List(String str) {
//   final List<int> codeUnits = str.codeUnits;
//   final Uint8List unit8List = Uint8List.fromList(codeUnits);

//   return unit8List;
// }

Future<Map<String, dynamic>> getUser() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('access_token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNlZWZjYmM1OGNlNTFlODQ4ZGUwYjRlIiwiaWF0IjoxNjc2NjM1Nzg2LCJleHAiOjE2NzY2MzkzODZ9.C1Edc9D-BL0LoV_1m-hfWJzRooUPFV-hWQMm5CLrXYY');


  print(access_token);
  // final encrypter = Encrypter(Salsa20(key));

  // final algo = AesCtr.with128bits(macAlgorithm: MacAlgorithm.empty);
  //  final encrypted = encrypter.encrypt('plainText', iv: iv);
  // final decrypted = encrypter.decrypt(encrypted, iv: iv);

  final response1 = await http.get(
    Uri.parse('$baseUrl/api/user/'),
    headers: {"Authorization": "Token $access_token"},
  );

  print(response1.body);
  return {};
}



