import 'package:flutter/material.dart';

class GuestScreen extends StatelessWidget {
  final String courses;
  const GuestScreen({super.key, required this.courses});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text(courses)),
    );
  }

}