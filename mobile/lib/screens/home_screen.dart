import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:test1/models/user.dart';
import 'package:test1/widgets/course_card.dart';

import '../apis/courses/course_api.dart';
import '../models/course.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  Future<Box> getCurrentUser() async {
    var box = Hive.openBox('coursehub-data');

    return box;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Box>(
        future: getCurrentUser(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final user_json = (snapshot.data!.get('user'));
            print(user_json['name']);

            final user = User.fromJson(user_json);
            print(user.name);
            return SafeArea(
              child: Scaffold(
                backgroundColor: Colors.black,
                body: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 0.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          SizedBox(
                            width: 26.0,
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  "Welcome,",
                                  style: TextStyle(
                                    fontSize: 20.0,
                                    fontFamily: "ProximaNova",
                                    fontWeight: FontWeight.w400,
                                    color: Colors.white,
                                  ),
                                ),
                                Text(
                                  user.name,
                                  style: TextStyle(
                                    fontSize: 20.0,
                                    fontFamily: "ProximaNova",
                                    fontWeight: FontWeight.w700,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SvgPicture.asset("assets/home_books.svg"),
                        ],
                      ),
                      SizedBox(
                        height: 26.0,
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 26.0),
                        child: Text(
                          "MY COURSES",
                          style: TextStyle(
                            fontSize: 16.0,
                            fontFamily: "ProximaNova",
                            fontWeight: FontWeight.w700,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 26.0),
                        child: Expanded(
                            child: Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 0.0, vertical: 19.0),
                          child: GridView.count(
                            crossAxisCount: 2,
                            crossAxisSpacing: 23.0,
                            mainAxisSpacing: 16.0,
                            childAspectRatio: 1.25,
                            shrinkWrap: true,
                            children: user.courses.map((e) {
                              return CourseCard(course: e);
                            }).toList(),
                          ),
                        )),
                      ),
                    ],
                  ),
                ),
              ),
            );
          } else {
            return Center(
              child: SizedBox(
                width: 100,
                child: LinearProgressIndicator(
                  color: Color.fromRGBO(254, 217, 111, 1),
                  backgroundColor: Colors.black,
                ),
              ),
            );
          }
        });
  }
}
