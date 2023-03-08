import 'package:flutter/material.dart';
import 'package:CourseHub/constants/themes.dart';

class CustomLinearProgress extends StatelessWidget {
  const CustomLinearProgress({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: SizedBox(
        width: 100,
        child: LinearProgressIndicator(
          color: Themes.kYellow,
          backgroundColor: Colors.black,
        ),
      ),
    );
  }
}
