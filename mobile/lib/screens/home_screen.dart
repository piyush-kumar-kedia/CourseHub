import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/models/user.dart';
import 'package:test1/widgets/common/custom_linear_progress.dart';
import 'package:test1/widgets/home_screen/course_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  Future<User> getDetails() async {
    var box = await Hive.openBox('coursehub-data');
    final userJson = box.get('user');

    final user = User.fromJson(userJson);

    return user;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<User>(
        future: getDetails(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            var user = snapshot.data!;
            return Container(
              color: Colors.black,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 0.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                       const SizedBox(
                          width: 26.0,
                        ),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Welcome,",
                                style: Themes.theme.textTheme.displaySmall,
                              ),
                              Text(
                                user.name,
                                style: Themes.theme.textTheme.bodyLarge,
                              ),
                            ],
                          ),
                        ),
                        SvgPicture.asset("assets/home_books.svg"),
                      ],
                    ),
                    const SizedBox(
                      height: 26.0,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 26.0),
                      child: Text(
                        "MY COURSES",
                        style: Themes.theme.textTheme.bodyMedium
                      ),
                    ),
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 26.0, vertical: 19.0),
                        child: GridView.count(
                          physics: const ScrollPhysics(
                              parent: BouncingScrollPhysics()),
                          crossAxisCount: 2,
                          crossAxisSpacing: 23.0,
                          mainAxisSpacing: 16.0,
                          childAspectRatio: 1.25,
                          shrinkWrap: true,
                          children: user.courses.map((e) {
                            return CourseCard(course: e);
                          }).toList(),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          } else {
            return const CustomLinearProgress();
          }
        });
  }
}
