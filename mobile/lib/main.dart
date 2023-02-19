import 'package:flutter/material.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:test1/screens/dummy_screen.dart';

import 'package:test1/widgets/nav_bar_custom.dart';

void main() async {
  await Hive.initFlutter();

  runApp(MyApp());
}

final navigatorKey = GlobalKey<NavigatorState>();

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      key: navigatorKey,
      home: SafeArea(child: Scaffold(body: NavBarCustom())),
    );
  }
}
class RemoveScrollGlow extends ScrollBehavior {
  @override
  Widget buildOverscrollIndicator(
      BuildContext context, Widget child, ScrollableDetails details) {
    return child;
  }
}