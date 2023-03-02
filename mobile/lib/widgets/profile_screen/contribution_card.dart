import 'package:flutter/material.dart';
import 'package:test1/constants/themes.dart';

class ContributionCard extends StatefulWidget {
  const ContributionCard({Key? key}) : super(key: key);

  @override
  State<ContributionCard> createState() => _ContributionCardState();
}

class _ContributionCardState extends State<ContributionCard> {
  final String courseName = "CL303";

  final int year = 2022;

  final String contextType = "Lecture Slides";

  String description =
      "Description description description cription description Descrip Descripcription description Description description descriptionDescription description description Your go-to platform for all your academic needs. Get access to past papers, lecture slides, assignments, tutorials, notes and more to help you ace your exams";

  bool isApproved = true;

  // TODO set format of date


  @override
  Widget build(BuildContext context) {
    return Container(
      color: Themes.kYellow,
      padding: const EdgeInsets.all(20),
      margin: const EdgeInsets.symmetric(vertical: 5),
      child: Column(
        children: [
          Row(
            children: [
              Text(courseName,
                  overflow: TextOverflow.ellipsis,
                  style: Themes.darkTextTheme.displaySmall),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 0),
            child: Text(
              description,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: Themes.darkTextTheme.bodySmall,
            ),
          ),
          Row(
            children: [
              Text(
                '12 June 2022',
                style: Themes.darkTextTheme.bodySmall,
              ),
              const SizedBox(width: 10,),
              Text(
                '12:58 pm',
                style: Themes.darkTextTheme.bodySmall,
              ),
              const Spacer(),
              TextButton(
                onPressed: () {},
                style: TextButton.styleFrom(
                  backgroundColor: Colors.black,
                  foregroundColor: Colors.white,
                  padding:
                      const EdgeInsets.symmetric(vertical: 0, horizontal: 20),
                  shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(0)),
                  ),
                ),
                child: Text(
                  isApproved ? 'APPROVED' : 'PENDING',
                  style: const TextStyle(
                    fontFamily: 'Proxima Nova',
                    fontWeight: FontWeight.w700,
                    fontSize: 11.1,
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
