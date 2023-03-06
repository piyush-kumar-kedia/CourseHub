import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/screens/browse_screen.dart';
import 'package:test1/screens/contribute_screen.dart';
import 'package:test1/screens/favourites_screen.dart';
import 'package:test1/screens/home_screen.dart';
import 'package:test1/screens/profile_screen.dart';
import 'package:test1/screens/search_screen.dart';
import 'package:test1/widgets/nav_bar/nav_bar_icon.dart';

class NavBarScreen extends StatefulWidget {
  const NavBarScreen({super.key});

  @override
  State<StatefulWidget> createState() => _NavBarScreen();
}

class _NavBarScreen extends State<NavBarScreen> {
  int _currentPageNumber = 0;
  bool _isSearched = false;

  void returnToPageCallback(int a) {
    setState(() {
      _currentPageNumber = a;
    });
  }

  void hideSearch() {
    setState(() {
      _isSearched = false;
    });
  }

  List<Widget> screens = [
    const HomeScreen(),
    BrowseScreen(
      code: "ma101",
      callback: (int a) {},
    ),
    ContributeScreen(
      callback: (int a) {},
    ),
    const FavouritesScreen(),
    const ProfileScreen(),
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
      ContributeScreen(
        callback: returnToPageCallback,
      ),
      const FavouritesScreen(),
      const ProfileScreen(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: SafeArea(
        child: Stack(
          children: [
            Column(
              children: [
                Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
                  color: Colors.black,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        flex: 10,
                        child: Text(
                          'CourseHub',
                          style: Themes.theme.textTheme.displayMedium,
                        ),
                      ),
                      const SizedBox(
                        width: 20,
                      ),
                      Expanded(
                        flex: 1,
                        child: GestureDetector(
                          onTap: () {
                            setState(() {
                              _isSearched = true;
                            });
                          },
                          child: SvgPicture.asset(
                            'assets/search.svg',
                            colorFilter: const ColorFilter.mode(
                                Colors.white, BlendMode.srcIn),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                Expanded(
                  child: Stack(
                    children: [
                      Column(
                        children: [
                          Expanded(child: screens[_currentPageNumber]),
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
                                      color: const Color.fromRGBO(
                                          254, 207, 111, 1),
                                    )
                                  ],
                                ),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    NavBarIcon(
                                        pageChangeCallback:
                                            returnToPageCallback,
                                        isSelected: _currentPageNumber == 0,
                                        label: 'Home'),
                                    NavBarIcon(
                                        pageChangeCallback:
                                            returnToPageCallback,
                                        isSelected: _currentPageNumber == 1,
                                        label: 'Browse'),
                                    Column(
                                      children: [
                                        Ink(
                                          child: InkWell(
                                            onTap: () {
                                              setState(() {
                                                _currentPageNumber = 2;
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
                                            style:
                                                Themes.darkTextTheme.bodySmall),
                                        const SizedBox(
                                          height: 8.0,
                                        )
                                      ],
                                    ),
                                    NavBarIcon(
                                        pageChangeCallback:
                                            returnToPageCallback,
                                        isSelected: _currentPageNumber == 3,
                                        label: 'Favourites'),
                                    NavBarIcon(
                                        pageChangeCallback:
                                            returnToPageCallback,
                                        isSelected: _currentPageNumber == 4,
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
            Visibility(
              visible: _isSearched,
              child: SearchScreen(
                callback: hideSearch,
              ),
            )
          ],
        ),
      ),
    );
  }
}
