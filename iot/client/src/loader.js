import { Group, AxesHelper, MathUtils } from "three";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default class Edukit {
  constructor() {
    this.loader = new FBXLoader();
    this.object = {};
    this.loaded = false;
    this.axes = {};
  }

  async fileload(scene) {
    const group1 = (this.object.group = new Group());
    const group2 = (this.object.group = new Group());
    const group3 = (this.object.group = new Group());
    const groupY = (this.axes.yAxis = new Group());
    const groupX = (this.axes.xAxis = new Group());
    const groupX2 = (this.axes.xAxis2 = new Group());

    groupX2.position.x = 5;
    group3.position.x = 10;

    const body = await this.loader.loadAsync("files/Body.FBX");
    body.position.x = -15;
    body.scale.set(0.0005, 0.0005, 0.0005);

    const mesh1 = (this.object.mesh1 = await this.loader.loadAsync(
      "files/StaticMesh1.FBX"
    ));
    const mesh2 = (this.object.mesh2 = await this.loader.loadAsync(
      "files/StaticMesh2.FBX"
    ));
    const mesh3 = (this.object.mesh3 = await this.loader.loadAsync(
      "files/StaticMesh3.FBX"
    ));
    const mesh4 = (this.object.mesh4 = await this.loader.loadAsync(
      "files/StaticMesh4.FBX"
    ));
    const RobotBody1 = (this.object.RobotBody1 = await this.loader.loadAsync(
      "files/Robot_1_Body.FBX"
    ));
    const RobotBody2 = (this.object.RobotBody2 = await this.loader.loadAsync(
      "files/Robot_2_Body.FBX"
    ));
    const RobotPusher1 = (this.object.RobotPusher1 =
      await this.loader.loadAsync("files/Robot_1_Pusher.FBX"));
    const RobotPusher2 = (this.object.RobotPusher2 =
      await this.loader.loadAsync("files/Robot_2_Pusher.FBX"));

    mesh1.position.y = -1.5;
    mesh1.rotation.x = -90 * (Math.PI / 180);
    mesh1.rotation.z = -160 * (Math.PI / 180);

    mesh2.position.y = -1.3;
    mesh2.position.x = 1.8;
    mesh2.rotation.x = -90 * (Math.PI / 180);
    mesh2.rotation.z = -10 * (Math.PI / 180);

    mesh3.position.z = -1.4;
    mesh3.rotation.x = -90 * (Math.PI / 180);
    mesh3.rotation.z = -170 * (Math.PI / 180);

    mesh4.position.z = -2.8;
    mesh4.rotation.x = -90 * (Math.PI / 180);
    mesh4.rotation.z = -170 * (Math.PI / 180);

    RobotBody1.rotation.x = 90 * (Math.PI / 180);
    RobotBody1.rotation.y = -180 * (Math.PI / 180);
    RobotPusher1.rotation.x = 90 * (Math.PI / 180);
    RobotPusher1.rotation.y = -180 * (Math.PI / 180);

    RobotBody2.rotation.x = 90 * (Math.PI / 180);
    RobotBody2.rotation.y = -180 * (Math.PI / 180);
    RobotPusher2.rotation.x = 90 * (Math.PI / 180);
    RobotPusher2.rotation.y = -180 * (Math.PI / 180);

    for (const [_, object] of Object.entries(this.object)) {
      object.scale.set(0.5, 0.5, 0.5);
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
    group1.position.set(-10, 0, 0);
    group2.position.set(0, 0, 0);
    group3.position.set(10, 0, 0);

    group1.add(RobotBody1, RobotPusher1);
    group2.add(RobotBody2, RobotPusher2);

    groupX2.add(mesh1, new AxesHelper(7));
    groupX.add(mesh2, groupX2, new AxesHelper(7));
    groupY.add(groupX, mesh3);
    group3.add(groupY, mesh4);

    scene.add(group1);
    scene.add(group2);
    scene.add(group3);

    this.loaded = true;
  }

  actionY(value) {
    const currentY = this.axes.yAxis.position.y;
    if (value.toFixed(2) < currentY.toFixed(2)) {
      this.axes.yAxis.position.y -= 0.05;
    } else if (value.toFixed(2) > currentY.toFixed(2)) {
      this.axes.yAxis.position.y += 0.05;
    }
  }

  actionX(value) {
    const currentX = this.axes.xAxis2.rotation.y;
    if (value.toFixed(2) < currentX.toFixed(2)) {
      this.axes.xAxis.rotation.y += MathUtils.degToRad(1);
      this.axes.xAxis2.rotation.y += MathUtils.degToRad(-1);
    } else if (value.toFixed(2) > currentX.toFixed(2)) {
      this.axes.xAxis.rotation.y += MathUtils.degToRad(-1);
      this.axes.xAxis2.rotation.y += MathUtils.degToRad(1);
    }
  }
}
