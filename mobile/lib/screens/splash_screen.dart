import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../apis/authentication/login.dart';
import 'login_screen.dart';
import 'nav_bar_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToHome();
  }

  _navigateToHome() async {
    await Future.delayed(const Duration(seconds: 2), () async {
      //TODO: Add all svgs here
      const loaders = [
        SvgAssetLoader('assets/cc_logo.svg'),
        SvgAssetLoader('assets/favourites_card.svg'),
        SvgAssetLoader('assets/favourites.svg'),
        SvgAssetLoader('assets/folder_card.svg'),
        SvgAssetLoader('assets/home_books.svg'),
        SvgAssetLoader('assets/my_profile_no_contri.svg'),
        SvgAssetLoader('assets/my_profile.svg'),
        SvgAssetLoader('assets/search.svg'),
        SvgAssetLoader('assets/microsoft.svg'),
        SvgAssetLoader('assets/landing.svg'),
        SvgAssetLoader(''),
        SvgAssetLoader(''),
        SvgAssetLoader(''),
        SvgAssetLoader(''),
      ];
      loaders.map(
        (loader) => svg.cache.putIfAbsent(
          loader.cacheKey(null),
          () => loader.loadBytes(null),
        ),
      );
    });

    if (!mounted) return;
    Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => FutureBuilder(
              future: isLoggedIn(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  final isLoggedIn = snapshot.data ?? false;

                  if (!isLoggedIn) {
                    return const LoginScreen();
                  } else {
                    return const NavBarScreen();
                  }
                } else {
                  return const Scaffold(
                    backgroundColor: Colors.white,
                  );
                }
              }),
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Center(
        child: DefaultTextStyle(
          style: const TextStyle(
              fontSize: 50.0, fontWeight: FontWeight.w700, color: Colors.white),
          child: AnimatedTextKit(
            animatedTexts: [
              TypewriterAnimatedText('CourseHub',
                  speed: const Duration(milliseconds: 100)),
            ],
          ),
        ),
      ),
    );
  }
}
