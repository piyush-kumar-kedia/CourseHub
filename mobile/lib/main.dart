import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:test1/screens/dummy_screen.dart';
import 'package:test1/screens/favourites.dart';
import 'package:test1/screens/home_screen.dart';
import 'package:test1/screens/login_screen.dart';
import 'package:test1/screens/profile.dart';
import 'package:test1/widgets/nav_bar.dart';
import 'package:test1/widgets/nav_bar_custom.dart';

void main() => runApp(MyApp());

final navigatorKey = GlobalKey<NavigatorState>();

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        key: navigatorKey,
        home: Scaffold(
          body: LoginScreen(),
        ));
  }
}
