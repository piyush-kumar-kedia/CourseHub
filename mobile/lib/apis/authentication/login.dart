import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hive/hive.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'package:test1/constants/endpoints.dart';
import 'package:test1/apis/user/user.dart';
import 'package:test1/screens/login_screen.dart';

import '../../database/hive_store.dart';
import '../protected.dart';

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

Future<void> logoutHandler(context) async {
  final prefs = await SharedPreferences.getInstance();
  prefs.clear();

  final box = await Hive.openBox('coursehub-data');
  box.clear();

  Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (context) => const LoginScreen()),
      (route) => false);
}

Future<bool> isLoggedInAndSetData() async {
  final access = await getAccessToken();

  if (access != 'error') {
    final box = await Hive.openBox('coursehub-data');
    HiveStore.userData = box.get('user');

    return true;
  } else {
    return false;
  }
}

