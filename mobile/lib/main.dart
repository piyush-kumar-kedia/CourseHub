import 'package:flutter/material.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:test1/screens/login_screen.dart';




void main() async {

  await Hive.initFlutter();

  runApp(MyApp());
  }

final navigatorKey = GlobalKey<NavigatorState>();

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        scrollBehavior: RemoveScrollGlow(),
        key: navigatorKey,
        home: Scaffold(
          body: LoginScreen(),
        ));
  }
}
class RemoveScrollGlow extends ScrollBehavior {
  @override
  Widget buildOverscrollIndicator(
      BuildContext context, Widget child, ScrollableDetails details) {
    return child;
  }
}