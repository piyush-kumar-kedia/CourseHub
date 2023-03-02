import 'package:flutter/material.dart';
import 'package:test1/main.dart';

void showSnackBar(String message,context) {
  final snackbar = SnackBar(
    content: Center(
      child: Text(
        message,
        style: const TextStyle(color: Colors.black),
      ),
    ),
    backgroundColor:
        const Color.fromRGBO(254, 207, 111, 1), 
    behavior: SnackBarBehavior.floating,
    margin: const EdgeInsets.all(50),
  );

  ScaffoldMessenger.of(context).showSnackBar(snackbar);
}
