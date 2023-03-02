import 'package:flutter/material.dart';
import 'package:test1/constants/themes.dart';

void showSnackBar(String message,context) {
  final snackbar = SnackBar(
   elevation: 10,
   duration: const Duration(milliseconds: 1000),
    content: Center(
      child: Text(
        message,
        style: const TextStyle(color: Colors.black),
      ),
    ),
    backgroundColor:
    Themes.kYellow, 
    behavior: SnackBarBehavior.floating,
    margin: const EdgeInsets.all(50),
  );

  ScaffoldMessenger.of(context).showSnackBar(snackbar);
}
