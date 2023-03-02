import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:test1/screens/login_screen.dart';
import 'package:test1/widgets/common/custom_snackbar.dart';

Future<String> getAccessToken() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('access_token');

  if (token != null) {
    return 'Token $token';
  } else {
   

    
    return 'error';
  }
}
