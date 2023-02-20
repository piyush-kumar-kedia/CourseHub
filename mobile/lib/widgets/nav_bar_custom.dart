import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:hive/hive.dart';
import 'package:test1/screens/browse_screen.dart';
import 'package:test1/screens/contribute_screen.dart';
import 'package:test1/screens/favourites_screen.dart';
import 'package:test1/screens/home_screen.dart';
import 'package:test1/screens/profile_screen.dart';
import 'package:test1/widgets/wrapper.dart';

import '../models/user.dart';

class NavBarCustom extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _NavBarCustom();
}

class _NavBarCustom extends State<NavBarCustom> {
  int currentPageNumber = 0;

  void returnToHomeCallback() {
    setState(() {
      currentPageNumber = 0;
    });
  }

  List<Widget> screens = [
    const HomeScreen(),
    BrowseScreen(
      code: "ma101",
      callback: () {},
    ),
    const ContributeScreen(),
    FavouritesScreen(),
    const Wrapper(),
  ];

  @override
  void initState() {
    super.initState();
    screens = [
      const HomeScreen(),
      BrowseScreen(
        code: "ce101",
        callback: returnToHomeCallback,
      ),
      const ContributeScreen(),
      FavouritesScreen(),
      const Profile(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          Container(
            height: 80,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
            width: double.infinity,
            color: Colors.black,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'CourseHub',
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                      fontFamily: "ProximaNova",
                      fontSize: 24),
                ),
                SvgPicture.asset('assets/search.svg')
              ],
            ),
          ),
          Expanded(
            child: Stack(
              children: [
                Column(
                  children: [
                    Expanded(child: screens[currentPageNumber]),
                    const SizedBox(
                      height: 68.0,
                    ),
                  ],
                ),
                Column(
                  children: [
                    const Spacer(),
                    SizedBox(
                      height: 90.0,
                      child: Stack(
                        children: [
                          Column(
                            children: [
                              const Spacer(),
                              Container(
                                height: 68.0,
                                color: const Color.fromRGBO(254, 207, 111, 1),
                              )
                            ],
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: [
                              Column(
                                children: [
                                  const Spacer(),
                                  Ink(
                                    child: InkWell(
                                      onTap: () {
                                        setState(() {
                                          currentPageNumber = 0;
                                        });
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(12.0),
                                          ),
                                          color: (currentPageNumber == 0)
                                              ? Colors.white
                                              : Colors.transparent,
                                        ),
                                        child: const Padding(
                                          padding: EdgeInsets.all(4.0),
                                          child: Icon(
                                            Icons.home,
                                            color: Colors.black,
                                            size: 30.0,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const Text("Home"),
                                  const SizedBox(
                                    height: 8.0,
                                  )
                                ],
                              ),
                              Column(
                                children: [
                                  const Spacer(),
                                  Ink(
                                    child: InkWell(
                                      onTap: () {
                                        setState(() {
                                          currentPageNumber = 1;
                                        });
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(12.0),
                                          ),
                                          color: (currentPageNumber == 1)
                                              ? Colors.white
                                              : Colors.transparent,
                                        ),
                                        child: const Padding(
                                          padding: EdgeInsets.all(4.0),
                                          child: Icon(
                                            Icons.folder,
                                            color: Colors.black,
                                            size: 30.0,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const Text("Browse"),
                                  const SizedBox(
                                    height: 8.0,
                                  )
                                ],
                              ),
                              Column(
                                children: [
                                  Ink(
                                    child: InkWell(
                                      onTap: () {
                                        setState(() {
                                          currentPageNumber = 2;
                                        });
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: Colors.white,
                                          border: Border.all(
                                              color: Colors.black, width: 2.0),
                                        ),
                                        child: const Padding(
                                          padding: EdgeInsets.all(16.0),
                                          child: Icon(
                                            Icons.add,
                                            color: Colors.black,
                                            size: 30.0,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const Spacer(),
                                  const Text("Contribute"),
                                  const SizedBox(
                                    height: 8.0,
                                  )
                                ],
                              ),
                              Column(
                                children: [
                                  const Spacer(),
                                  Ink(
                                    child: InkWell(
                                      onTap: () {
                                        setState(() {
                                          currentPageNumber = 3;
                                        });
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(12.0),
                                          ),
                                          color: (currentPageNumber == 3)
                                              ? Colors.white
                                              : Colors.transparent,
                                        ),
                                        child: const Padding(
                                          padding: EdgeInsets.all(4.0),
                                          child: Icon(
                                            Icons.star,
                                            color: Colors.black,
                                            size: 30.0,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const Text("Favourites"),
                                  const SizedBox(
                                    height: 8.0,
                                  )
                                ],
                              ),
                              Column(
                                children: [
                                  const Spacer(),
                                  Ink(
                                    child: InkWell(
                                      onTap: () {
                                        setState(() {
                                          currentPageNumber = 4;
                                        });
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(12.0),
                                          ),
                                          color: (currentPageNumber == 4)
                                              ? Colors.white
                                              : Colors.transparent,
                                        ),
                                        child: const Padding(
                                          padding: EdgeInsets.all(4.0),
                                          child: Icon(
                                            Icons.person,
                                            color: Colors.black,
                                            size: 30.0,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const Text("Profile"),
                                  const SizedBox(
                                    height: 8.0,
                                  )
                                ],
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
