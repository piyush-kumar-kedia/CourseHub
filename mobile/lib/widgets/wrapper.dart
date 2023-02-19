import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';


class Wrapper extends StatelessWidget {
  const Wrapper({super.key});

  @override
  Widget build(BuildContext context) {
     return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Container(
              height: 100,
              color: const Color.fromRGBO(254, 207, 111, 1),
            ),
            Spacer(),
            Container(
              color: Colors.black,
              height: 60,
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
               child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'YEAR',
                    style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w800,
                        fontFamily: "ProximaNova",
                        fontSize: 16),
                  ),
                  SvgPicture.asset('assets/search.svg')
                ],
              ),
              
            )
          ],
        ),
      ),
    );
  }
}