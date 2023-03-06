import 'package:flutter/material.dart';
import 'package:test1/apis/authentication/login.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/screens/nav_bar_screen.dart';
import 'package:test1/widgets/common/custom_snackbar.dart';
import 'package:test1/widgets/login_screen/cc_branding.dart';
import 'package:test1/widgets/login_screen/login_button.dart';


class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final theImage = const AssetImage('assets/landing.png');

  // @override
  // void didChangeDependencies() async{
  //   await precacheImage(theImage, context);
  //   super.didChangeDependencies();
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Container(
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: theImage,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Column(
              children: [
                Expanded(
                  flex: 4,
                  child: Row(
                    children: [
                      const Spacer(
                        flex: 5,
                      ),
                      Expanded(
                        flex: 2,
                        child: Container(
                          color: Colors.black,
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: const [
                              RotatedBox(
                                quarterTurns: 1,
                                child: Text(
                                  'CourseHub',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 70,
                                      fontWeight: FontWeight.w700),
                                ),
                              ),
                              CCBranding()
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                        vertical: 20, horizontal: 16),
                    color: Themes.kYellow,
                    child: Column(
                      children: [
                        const Expanded(
                          child: Text(
                            'Your go-to platform for all your academic needs. Get access to past papers, lecture slides, assignments, tutorials, notes and more to help you ace your exams',
                            textAlign: TextAlign.left,
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              color: Colors.black,
                              fontSize: 14.0,
                            ),
                          ),
                        ),
                        Expanded(
                          child: GestureDetector(
                            onTap: () async {
                              try {
                                await authenticate();
                                if (!mounted) return;

                                Navigator.of(context).pushReplacement(
                                  MaterialPageRoute(
                                    builder: (context) => const NavBarScreen(),
                                  ),
                                );

                                showSnackBar(
                                    'Successfully Logged In!', context);
                              } catch (e) {
                                Navigator.of(context).pushAndRemoveUntil(
                                    MaterialPageRoute(
                                      builder: (context) => const LoginScreen(),
                                    ),
                                    (route) => false);

                                showSnackBar('Something Went Wrong!', context);
                              }
                            },
                            child: const LoginButton(),
                          ),
                        )
                      ],
                    ),
                  ),
                )
              ],
            )
            //
          ],
        ),
      ),
    );
  }
}
