import 'package:coursehub_api/apis/endpoints.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';

Future<void> authenticate() async {

  try {
    final result = await FlutterWebAuth.authenticate(
        url: AuthEndpints.getAccess, callbackUrlScheme: "foobar");

    print(result);

    final prefs = await SharedPreferences.getInstance();

    prefs.setString('access_token', result.split('=')[1]);
  } on PlatformException catch (e) {}
}
