import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:test1/apis/authentication/login.dart';
import 'package:test1/screens/login_screen.dart';
import 'package:test1/screens/nav_bar_screen.dart';
import './constants/themes.dart';

void main() async {
  await Hive.initFlutter();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(statusBarColor: Colors.black),
    );

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: Themes.theme,
      home: FutureBuilder(
          future: isLoggedIn(),
          builder: (context, snapshot) {
            final isLoggedIn = snapshot.data ?? false;

            if (!isLoggedIn) {
              return const LoginScreen();
            } else {
              return const NavBarScreen();
            }
          }),
    );
  }
}
