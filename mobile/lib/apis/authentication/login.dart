import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:test1/apis/endpoints.dart';
import 'package:test1/apis/user/user.dart';


Future<void> authenticate() async {
  try {
    final result = await FlutterWebAuth.authenticate(
        url: AuthEndpints.getAccess, callbackUrlScheme: "foobar");
    final prefs = await SharedPreferences.getInstance();
    var accessToken = result.split('=')[1];
    prefs.setString('access_token', accessToken);

    await getCurrentUser();

 
  } on PlatformException catch (_) {
    rethrow;
  } catch (e) {
    rethrow;
  }
}
