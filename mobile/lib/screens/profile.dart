import 'dart:ui';

import "package:flutter/material.dart";
import 'package:flutter_svg/flutter_svg.dart';
import 'package:test1/widgets/contribution.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  String name = "Atharva Tagalpallewar";
  String branch = "Chemical Engineering";
  int sem = 6;
  String th = "th";
  int contriCount = 4;
  void setupC() {
    if (sem == 1) {
      th = "st";
    } else if (sem == 2) {
      th = "nd";
    } else if (sem == 3) {
      th = "rd";
    }
  }

  @override
  Widget build(BuildContext context) {
    setupC();
    return Scaffold(
      // backgroundColor: Color(0x1F1F1F),
      body: Column(
        children: [
          Container(
            color: Colors.black,
            child: Column(children: [
              const SizedBox(
                height: 80,
              ),
              Container(
                alignment: Alignment.topLeft,
                padding:
                    const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
                width: double.infinity,
                child: const Text(
                  "MY PROFILE",
                  style: TextStyle(
                    fontFamily: 'Proxima Nova',
                    fontWeight: FontWeight.w700,
                    fontSize: 16,
                    color: Colors.white,
                  ),
                ),
              ),
              Container(
                alignment: Alignment.topLeft,
                padding:
                    const EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                width: double.infinity,
                child: Text(
                  name,
                  style: const TextStyle(
                    fontFamily: 'Proxima Nova',
                    fontWeight: FontWeight.w700,
                    fontSize: 28,
                    color: Colors.white,
                  ),
                ),
              ),
              Container(
                alignment: Alignment.topLeft,
                padding:
                    const EdgeInsets.symmetric(vertical: 5, horizontal: 30),
                width: double.infinity,
                child: Text(
                  "B.tech, $branch",
                  style: const TextStyle(
                    fontFamily: 'Proxima Nova',
                    fontWeight: FontWeight.w400,
                    fontSize: 16,
                    color: Colors.white,
                  ),
                ),
              ),
              Container(
                alignment: Alignment.topLeft,
                padding:
                    const EdgeInsets.symmetric(vertical: 10, horizontal: 30),
                width: double.infinity,
                child: Card(
                  color: const Color(0xffFECF6F),
                  child: Container(
                    alignment: Alignment.topLeft,
                    padding:
                        const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
                    width: 80,
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                      Container(
                        alignment: Alignment.topLeft,
                        margin: const EdgeInsets.fromLTRB(5, 5, 0, 0),
                        child: Wrap(
                          children: [
                            Text(
                              sem.toString(),
                              style: const TextStyle(
                                fontFamily: 'Proxima Nova',
                                fontWeight: FontWeight.w700,
                                fontSize: 18.8,
                              ),
                            ),
                            Text(
                              th,
                              style: const TextStyle(
                                fontFeatures: [FontFeature.superscripts()],
                                fontFamily: 'Proxima Nova',
                                fontWeight: FontWeight.w700,
                                // fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        alignment: Alignment.topLeft,
                        margin: const EdgeInsets.fromLTRB(5, 5, 0, 0),
                        child: const Text(
                          "Semester",
                          style: TextStyle(
                            fontFamily: 'Proxima Nova',
                            fontWeight: FontWeight.w400,
                            fontSize: 14.1,
                          ),
                        ),
                      ),
                    ]),
                  ),
                ),
              ),
              SvgPicture.asset(
                './assets/images/my_profile.svg',
                fit: BoxFit.scaleDown,
              )
            ]),
          ),
          Expanded(
            child: Column(
              children: [
                Container(
                  alignment: Alignment.topLeft,
                  padding: const EdgeInsets.symmetric(
                      vertical: 20, horizontal: 30),
                  width: double.infinity,
                  child: const Text(
                    "MY CONTRIBUTIONS",
                    style: TextStyle(
                      fontFamily: 'Proxima Nova',
                      fontWeight: FontWeight.w700,
                      fontSize: 16,
                      color: Colors.black,
                    ),
                  ),
                ),
                contriCount>0?
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                          vertical: 0, horizontal: 15),
                      child: ListView.builder(
                        padding: EdgeInsets.zero,
                        itemCount: contriCount,
                        itemBuilder: (ctx, index) {
                          return const ContributionCard();
                        },
                      ),
                    ),
                  ):Expanded(
                    child: Center(
                      child: SvgPicture.asset(
                      './assets/images/my_profile_no_contri.svg',
                      fit: BoxFit.scaleDown,
                ),
                    ),
                  )



              ],
            ),
          )
        ],
      ),
    );
  }
}
