import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:test1/screens/guest_screen.dart';
import 'package:http/http.dart' as http;

class LoginScreen extends StatelessWidget {
  Function callback;
 LoginScreen({super.key,required this.callback});

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
                image: AssetImage('assets/login_page.png'), fit: BoxFit.cover),
          ),
        ),
        Container(
          alignment: Alignment.topRight,
          child: SizedBox(
            width: 120.0,
            height: double.infinity,
            child: const DecoratedBox(
              decoration: const BoxDecoration(
                color: Colors.black,
              ),
            ),
          ),
        ),
        Container(
          margin: const EdgeInsets.fromLTRB(0, 70, 20, 0),
          alignment: Alignment.topRight,
          child: RotatedBox(
              quarterTurns: 1,
              child: Text("CourseHub",
                  style: TextStyle(
                      fontFamily: "Proxima Nova",
                      fontSize: 57.87,
                      fontWeight: FontWeight.w700,
                      color: Colors.white))),
        ),
        Column(
          children: <Widget>[
            Container(
                alignment: Alignment.topRight,
                // margin: const EdgeInsets.fromLTRB(0, 482, 50, 0),
                child: Text("by",
                    style: TextStyle(
                        fontFamily: "Proxima Nova",
                        fontSize: 12,
                        fontWeight: FontWeight.w300,
                        color: Colors.black))),

            // Expanded(
            //   child: FittedBox(
            //     child: FlutterLogo(),
            //   ),
            // ),
          ],
        ),
        Column(
          children: [
            Container(
                alignment: Alignment.topRight,
                margin: const EdgeInsets.fromLTRB(0, 482, 50, 0),
                child: Text("by",
                    style: TextStyle(
                        fontFamily: "Proxima Nova",
                        fontSize: 12,
                        fontWeight: FontWeight.w300,
                        color: Colors.white))),
            Container(
              margin: const EdgeInsets.fromLTRB(275, 0, 0, 0),
              height: 90,
              width: 70,
              child: Image(image: AssetImage("assets/img.png")),
            )
          ],
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: SizedBox(
            height: 160,
            width: double.infinity,
            child: const DecoratedBox(
              decoration: const BoxDecoration(color: Color(0xffFECF6F)),
            ),
          ),
        ),
        Align(
          alignment: Alignment.bottomCenter,
          child: SizedBox(
            height: 140,
            width: 302,
            child: Text(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa odio nibh eu eu nulla ac vestibulum amet. Ultrices magna ",
                style: TextStyle(
                    fontFamily: "Proxima Nova",
                    fontSize: 12,
                    fontWeight: FontWeight.w300,
                    color: Colors.black)),
          ),
        ),
        Container(
          margin: const EdgeInsets.fromLTRB(0, 700, 0, 0),
          alignment: Alignment.bottomCenter,
          child: Column(
            children: [
              Builder(builder: (context) {
                return GestureDetector(
                  onTap: ()  async {
                   // callback()
                    var url = Uri.parse('https://coursehub-api.onrender.com/api/course');
                    var response = await http.get(url);
                    String body = response.body;
                    var courses = jsonDecode(body);
                    var list = [];
                    for (var course in courses) {
                      list.add(course["name"]);
                    }
                    Navigator.of(context).push(MaterialPageRoute(builder: (context) => GuestScreen(courses: list.join("\n"))));
                  },
                  child: Container(
                    alignment: Alignment.bottomCenter,
                    width: 333,
                    height: 55,
                    decoration: const BoxDecoration(
                      color: Colors.black,
                    ),
                    child: Center(
                      child: Row(
                        children: [
                          Container(
                              margin: const EdgeInsets.fromLTRB(50, 0, 0, 0),
                              child: Image.asset('assets/image 4.png')),
                          Text("       Continue",
                              style: TextStyle(
                                  fontFamily: "Proxima Nova",
                                  fontSize: 16,
                                  fontWeight: FontWeight.w300,
                                  color: Colors.white),
                                  ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
            ],
          ),
        ),
      ],
    ));
  }
}
