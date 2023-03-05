import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/screens/browse_screen.dart';
import 'package:test1/screens/contribute_screen.dart';
import 'package:test1/screens/favourites_screen.dart';
import 'package:test1/screens/home_screen.dart';
import 'package:test1/screens/profile_screen.dart';
import 'package:test1/widgets/nav_bar/nav_bar_icon.dart';
import 'package:test1/widgets/nav_bar/search_card.dart';

class NavBarScreen extends StatefulWidget {
  const NavBarScreen({super.key});

  @override
  State<StatefulWidget> createState() => _NavBarScreen();
}

class _NavBarScreen extends State<NavBarScreen> {
  int currentPageNumber = 0;
  var _isSearched = false;
  final _searchController = TextEditingController();
  var _searchResult = '';

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
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 30),
              color: _isSearched ? Colors.white : Colors.black,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  !_isSearched
                      ? Expanded(
                          flex: 10,
                          child: Text(
                            'CourseHub',
                            style: Themes.theme.textTheme.displayMedium,
                          ),
                        )
                      : Expanded(
                          flex: 10,
                          child: TextField(
                            controller: _searchController,
                            cursorColor: Colors.grey,
                            decoration: const InputDecoration(
                              hintText: 'Search Courses',
                              focusedBorder: UnderlineInputBorder(),
                            ),
                          ),
                        ),
                  const SizedBox(
                    width: 20,
                  ),
                  Expanded(
                    flex: 1,
                    child: GestureDetector(
                        onTap: () {
                          if (!_isSearched) {
                            setState(() {
                              _isSearched = true;
                            });
                          } else {


                            
                          }
                        },
                        child: SvgPicture.asset(
                          'assets/search.svg',
                          colorFilter: ColorFilter.mode(
                              _isSearched ? Colors.black : Colors.white,
                              BlendMode.srcIn),
                        )),
                  )
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
                  Visibility(
                    visible: _isSearched,
                    child: GestureDetector(
                      onTap: () {
                        setState(() {
                          _isSearched = false;
                        });
                      },
                      child: Container(
                        width: double.infinity,
                        height: double.infinity,
                        color: const Color.fromRGBO(255, 255, 255, 0.8),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 30, vertical: 30),
                        // child: Text('Press Enter to Search'),
                        child: ListView.builder(
                          physics: const BouncingScrollPhysics(),
                          itemCount: 1,
                          itemBuilder: (context, index) => const SearchCard(
                            isAvailable: true,
                            courseCode: 'ee101',
                            courseName: 'mathematics',
                          ),
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
