
{ pkgs, ... }: {
  channel = "stable-24.05"; # or "unstable"

  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.nodemon
  ];

  env = {};

  idx = {
    extensions = [];

    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "start"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };

    workspace = {
      onCreate = {
        npm-install = "npm install";
      };
      onStart = {};
    };
  };
}
