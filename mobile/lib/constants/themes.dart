import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class Themes {
  static const kYellow = Color.fromRGBO(254, 207, 111, 1);
  static final theme = ThemeData(
    primaryColor: kYellow,
    fontFamily: 'ProximaNova',
    splashColor: kYellow,
    textTheme: const TextTheme(
      labelMedium: TextStyle(
        color: Colors.white,
        fontWeight: FontWeight.w800,
        fontFamily: "ProximaNova",
        fontSize: 16,
      ),
      labelSmall: TextStyle(
          fontFamily: 'ProximaNova',
          fontSize: 14.0,
          fontWeight: FontWeight.w700,
          color: Colors.white),
      displayLarge: TextStyle(
          fontWeight: FontWeight.w700, color: Colors.white, fontSize: 28),
      displayMedium: TextStyle(
          fontWeight: FontWeight.w800, color: Colors.white, fontSize: 24),
      displaySmall: TextStyle(
        fontSize: 20.0,
        fontFamily: "ProximaNova",
        fontWeight: FontWeight.w400,
        color: Colors.white,
      ),
      bodySmall: TextStyle(
          fontWeight: FontWeight.w400, color: Colors.white, fontSize: 12),
      bodyMedium: TextStyle(
        fontSize: 16.0,
        fontFamily: "ProximaNova",
        fontWeight: FontWeight.w700,
        color: Colors.white,
      ),
      bodyLarge: TextStyle(
        fontSize: 20.0,
        fontFamily: "ProximaNova",
        fontWeight: FontWeight.w700,
        color: Colors.white,
      ),
    ),
  );

  static final darkTextTheme = TextTheme(
    displayMedium: const TextStyle(
      fontFamily: "ProximaNova",
      fontWeight: FontWeight.w700,
      color: Colors.black,
      fontSize: 18.0,
    ),
    bodySmall: GoogleFonts.inter(
        fontSize: 12, fontWeight: FontWeight.w400, color: Colors.black),
  );
}
