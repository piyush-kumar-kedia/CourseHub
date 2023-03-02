import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:test1/constants/themes.dart';
import 'package:test1/database/hive_store.dart';
import 'package:test1/widgets/home_screen/course_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = HiveStore.getUserDetails();

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
              child:
                  Text("MY COURSES", style: Themes.theme.textTheme.bodyMedium),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(
                    horizontal: 26.0, vertical: 19.0),
                child: GridView.count(
                  physics: const ScrollPhysics(parent: BouncingScrollPhysics()),
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
  }
}
