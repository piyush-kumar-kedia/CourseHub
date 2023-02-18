import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:test1/screens/guest_screen.dart';

import '../apis/login.dart';

class LoginScreen extends StatelessWidget {
  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            height: double.infinity,
            width: double.infinity,
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/login_page.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Container(
            height: double.infinity,
            width: double.infinity,
            child: Column(
              children: [
                Expanded(
                  child: Row(
                    children: [
                      Spacer(),
                      Container(
                        color: Colors.black,
                        height: double.infinity,
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24.0),
                          child: Column(
                            children: [
                              Spacer(),
                              RotatedBox(
                                quarterTurns: 1,
                                child: Text(
                                  "CourseHub",
                                  style: TextStyle(
                                    fontFamily: "ProximaNova",
                                    fontSize: 57.87,
                                    fontWeight: FontWeight.w700,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                              Spacer(),
                              Text(
                                "by",
                                style: TextStyle(
                                  fontFamily: "ProximaNova",
                                  fontSize: 16.0,
                                  fontWeight: FontWeight.w400,
                                  color: Colors.white,
                                ),
                              ),
                              SizedBox(
                                height: 20.0,
                              ),
                              SvgPicture.asset(
                                "assets/cc_logo.svg",
                                height: 60.0,
                              ),
                              SizedBox(
                                height: 20.0,
                              ),
                              Text(
                                "Coding Club",
                                style: TextStyle(
                                  fontFamily: "ProximaNova",
                                  fontSize: 16.0,
                                  fontWeight: FontWeight.w700,
                                  color: Colors.white,
                                ),
                              ),
                              Text(
                                "IIT Guwahati",
                                style: TextStyle(
                                  fontFamily: "ProximaNova",
                                  fontSize: 16.0,
                                  fontWeight: FontWeight.w400,
                                  color: Colors.white,
                                ),
                              ),
                              Spacer(),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Container(
                  width: double.infinity,
                  color: Color(0xFFFECF6F),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Text(
                          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa odio nibh eu eu nulla ac vestibulum amet.",
                          style: TextStyle(
                            fontFamily: "ProximaNova",
                            fontSize: 14.0,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.fromLTRB(
                          16.0,
                          2.0,
                          16.0,
                          16.0,
                        ),
                        child: ElevatedButton(
                            onPressed: () async {
                              authenticate();
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.black,
                            ),
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                              child: Row(
                                children: [
                                  Spacer(),
                                  Image.asset("assets/image 4.png"),
                                  Spacer(),
                                  Text(
                                    "Sign in with Microsoft",
                                    style: TextStyle(
                                      fontFamily: "ProximaNova",
                                      color: Colors.white,
                                      fontWeight: FontWeight.w700,
                                      fontSize: 20.0,
                                    ),
                                  ),
                                  Spacer(),
                                ],
                              ),
                            )),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
