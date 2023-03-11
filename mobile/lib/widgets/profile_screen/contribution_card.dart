import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../../constants/themes.dart';
import '../../models/contribution.dart';

class ContributionCard extends StatelessWidget {
  final Contribution contribution;
  const ContributionCard({Key? key, required this.contribution})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final pathString =
        '${contribution.courseCode.toUpperCase()}  >  ${contribution.year}  >  ${contribution.folder}';

    var formatter = DateFormat("MMMM dd, yyyy");
    String formattedTime =
        DateFormat('kk:mm:a').format(contribution.createdAt).toLowerCase();
    String formattedDate = formatter.format(contribution.createdAt);

    return Container(
      color: Themes.kYellow,
      padding: const EdgeInsets.all(20),
      margin: const EdgeInsets.symmetric(vertical: 5),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(pathString,
                  overflow: TextOverflow.ellipsis,
                  style: Themes.darkTextTheme.displaySmall),
            ],
          ),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 0),
            child: Text(
              contribution.description,
              maxLines: 2,
              textAlign: TextAlign.start,
              overflow: TextOverflow.ellipsis,
              style: Themes.darkTextTheme.bodySmall,
            ),
          ),
          Row(
            children: [
              Text(
                formattedDate,
                style: Themes.darkTextTheme.bodySmall,
              ),
              const SizedBox(
                width: 10,
              ),
              Text(
                formattedTime,
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
                  contribution.approved ? 'APPROVED' : 'PENDING',
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
