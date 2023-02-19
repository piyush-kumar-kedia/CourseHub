import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:test1/apis/endpoints.dart';
import 'package:test1/main.dart';
import 'package:test1/widgets/custom_snackbar.dart';
import 'package:flutter/material.dart';

Future<void> authenticate() async {
  try {
    final result = await FlutterWebAuth.authenticate(
        url: AuthEndpints.getAccess, callbackUrlScheme: "foobar");
    final prefs = await SharedPreferences.getInstance();

    var accessToken = result.split('=')[1];

    accessToken = accessToken.substring(0, accessToken.length - 1);

    prefs.setString('access_token', accessToken);
  } on PlatformException catch (_) {
    showSnackBar('Something Went Wrong');
  } catch (e) {
    showSnackBar('Something Went Wrong!');
  }
}
