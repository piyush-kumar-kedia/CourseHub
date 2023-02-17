import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:test1/screens/dummy_screen.dart';
import 'package:test1/widgets/nav_bar.dart';


void main() => runApp(MyApp());

final navigatorKey = GlobalKey<NavigatorState>();

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      key: navigatorKey,
    
      home: NavBar()
    );
  }
}
