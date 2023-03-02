import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:test1/constants/themes.dart';

import 'package:test1/screens/browse_screen.dart';
import 'package:test1/screens/contribute_screen.dart';
import 'package:test1/screens/favourites_screen.dart';
import 'package:test1/screens/home_screen.dart';
import 'package:test1/screens/profile_screen.dart';
import 'package:test1/widgets/nav_bar/nav_bar_icon.dart';

class NavBarScreen extends StatefulWidget {
  const NavBarScreen({super.key});

  @override
  State<StatefulWidget> createState() => _NavBarScreen();
}

class _NavBarScreen extends State<NavBarScreen> {
  int currentPageNumber = 0;

  void returnToPageCallback(int a) {
    setState(() {
      currentPageNumber = a;
    });
  }

  List<Widget> screens = [
    const HomeScreen(),
    BrowseScreen(
      code: "ma101",
      callback: (int a) {},
    ),
    const ContributeScreen(),
    FavouritesScreen(),
    const Profile(),
  ];

  @override
  void initState() {
    super.initState();
    screens = [
      const HomeScreen(),
      BrowseScreen(
        code: "ee207",
        callback: returnToPageCallback,
      ),
      const ContributeScreen(),
      FavouritesScreen(),
      const Profile(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
              color: Colors.black,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'CourseHub',
                    style: Themes.theme.textTheme.displayMedium,
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
                        height: 60,
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
                                NavBarIcon(
                                  pageChangeCallback: returnToPageCallback,
                                    isSelected: currentPageNumber == 0,
                                    label: 'Home'),
                                NavBarIcon(
                                  pageChangeCallback: returnToPageCallback,

                                    isSelected: currentPageNumber == 1,
                                    label: 'Browse'),
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
                                                color: Colors.black,
                                                width: 2.0),
                                          ),
                                          child: const Padding(
                                            padding: EdgeInsets.all(16.0),
                                            child: Icon(
                                              Icons.add,
                                              color: Colors.black,
                                              size: 24.0,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                    const Spacer(),
                                    Text("Contribute",
                                        style: Themes.darkTextTheme.bodySmall),
                                    const SizedBox(
                                      height: 8.0,
                                    )
                                  ],
                                ),
                                NavBarIcon(
                                  pageChangeCallback: returnToPageCallback,

                                    isSelected: currentPageNumber == 3,
                                    label: 'Favourites'),
                                NavBarIcon(
                                  pageChangeCallback: returnToPageCallback,
                                    isSelected: currentPageNumber == 4,
                                    label: 'Profile')
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
      ),
    );
  }
}
