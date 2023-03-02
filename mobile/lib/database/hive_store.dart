
import 'package:test1/models/favourites.dart';
import 'package:test1/models/user.dart';


class HiveStore {
  static Map<dynamic, dynamic> userData = {};

  static User getUserDetails() {
    return User.fromJson(userData);
  }

  static List<Favourite> getFavourites() {
    final userFav = userData['favourites'] as List<dynamic>;
    return userFav.map((e) => Favourite.fromJson(e)).toList();
  }
}

