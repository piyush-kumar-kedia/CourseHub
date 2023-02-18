import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:flutter/material.dart';

import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:test1/main.dart';

void showSnackBar(String message) {
  final snackbar = SnackBar(
    content: Text(message),
    backgroundColor: Theme.of(navigatorKey.currentContext!).primaryColor,
    behavior: SnackBarBehavior.floating,
    margin: const EdgeInsets.all(50),
  );

  ScaffoldMessenger.of(navigatorKey.currentContext!).showSnackBar(snackbar);
}

Future<void> authenticate() async {
  const url =
      'https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/authorize?client_id=89fc28dc-5aaf-471b-a9bf-f7411b5527f7&response_type=code&redirect_uri=https://www.coursehubiitg.in/api/auth/login/redirect/mobile&scope=offline_access%20user.read&state=12345&prompt=consent';

  try {
    final result = await FlutterWebAuth.authenticate(
        url: url, callbackUrlScheme: "foobar");

    print(result);

    final prefs = await SharedPreferences.getInstance();

    prefs.setString('access_token', result.split('=')[1]);
  } on PlatformException catch (e) {
    showSnackBar('Unable to Log in');
  }
}
