import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:test1/screens/home_screen.dart';
import 'package:test1/screens/login_screen.dart';
import 'package:cupertino_icons/cupertino_icons.dart';
import 'package:test1/widgets/wrapper.dart';

class NavBar extends StatefulWidget {
  const NavBar({super.key});

  @override
  State<NavBar> createState() => _NavBarState();
}

class _NavBarState extends State<NavBar> {
  List<Widget> _buildScreens() {
    return [
      HomeScreen(),
      Wrapper(),
      Wrapper(),
      Wrapper(),
      Wrapper(),
    ];
  }

  final PersistentTabController _controller =
      PersistentTabController(initialIndex: 0);

  List<PersistentBottomNavBarItem> _navBarsItems() {
    return [
      PersistentBottomNavBarItem(
        icon: Container(
          color: Colors.white,
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Icon(
              Icons.home,
              color: Colors.black,
              size: 30.0,
            ),
          ),
        ),
        inactiveIcon: Icon(
          Icons.home,
          color: Colors.black,
          size: 30.0,
        ),
        title: "Home",
        iconSize: 50.0,
      ),
      PersistentBottomNavBarItem(
        icon: Icon(
          Icons.folder,
          color: Colors.black,
          size: 30.0,
        ),
        title: "Browse",
      ),
      PersistentBottomNavBarItem(
        icon: Icon(
          Icons.add,
          color: Colors.black,
          size: 30.0,
        ),
        activeColorPrimary: Colors.white,
        title: "Contribute",
      ),
      PersistentBottomNavBarItem(
        icon: Icon(
          Icons.star,
          color: Colors.black,
          size: 30.0,
        ),
        title: "Favourites",
      ),
      PersistentBottomNavBarItem(
        icon: Icon(
          Icons.person,
          color: Colors.black,
          size: 30.0,
        ),
        title: "Profile",
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return PersistentTabView(
      context,

      controller: _controller,
      screens: _buildScreens(),
      items: _navBarsItems(),
      confineInSafeArea: true,
      navBarHeight: 75.0,
      backgroundColor:
          Color.fromRGBO(254, 207, 111, 1),
      decoration: NavBarDecoration(
        borderRadius: BorderRadius.circular(0.0),
      ),
      handleAndroidBackButtonPress: true,
      resizeToAvoidBottomInset:
          true,
      stateManagement: true,
      hideNavigationBarWhenKeyboardShows:
          true,
      popAllScreensOnTapOfSelectedTab: true,
      popActionScreens: PopActionScreensType.all,
      itemAnimationProperties: ItemAnimationProperties(
        // Navigation Bar's items animation properties.
        duration: Duration(milliseconds: 200),
        curve: Curves.ease,
      ),
      screenTransitionAnimation: ScreenTransitionAnimation(
        // Screen transition animation on change of selected tab.
        animateTabTransition: true,
        curve: Curves.ease,
        duration: Duration(milliseconds: 200),
      ),
      navBarStyle:
          NavBarStyle.style15, //
      // Choose the nav bar style with this property.
    );
  }
}
