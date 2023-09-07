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
    const groupV = (this.axes.group = new Group());
    const groupT = (this.axes.group = new Group());

    groupX2.position.x = 5;
    group3.position.x = 10;

    const body = await this.loader.loadAsync("files/Body.FBX");

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
    const Belt = (this.object.Belt = await this.loader.loadAsync(
      "files/Belt.FBX"
    ));
    const VisionSensor = (this.object.VisionSensor =
      await this.loader.loadAsync("files/VisionSensor.FBX"));

    const TB = (this.object.TB = await this.loader.loadAsync(
      "files/TrafficLight_Body.FBX"
    ));
    const TG = (this.object.TG = await this.loader.loadAsync(
      "files/TrafficLight_Green.FBX"
    ));
    const TR = (this.object.TR = await this.loader.loadAsync(
      "files/TrafficLight_Red.FBX"
    ));
    const TY = (this.object.TY = await this.loader.loadAsync(
      "files/TrafficLight_Yellow.FBX"
    ));

    body.scale.set(0.5, 0.5, 0.5);

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

    body.rotation.x = -90 * (Math.PI / 180);
    body.rotation.z = 180 * (Math.PI / 180);
    body.position.y = -3.5;
    body.position.z = -5;
    VisionSensor.rotation.y = -180 * (Math.PI / 180);

    for (const [_, object] of Object.entries(this.object)) {
      object.scale.set(0.5, 0.5, 0.5);
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    group1.add(RobotBody1, RobotPusher1);
    group2.add(RobotBody2, RobotPusher2);

    groupX2.add(mesh1, new AxesHelper(7));
    groupX.add(mesh2, groupX2, new AxesHelper(7));
    groupY.add(groupX, mesh3);
    group3.add(groupY, mesh4);

    group1.position.set(-10, 0, 0.5);
    group2.position.set(0, 0, 2);
    group3.position.set(10, 0, 4.5);
    Belt.position.set(0.5, -3.5, 22.5);
    VisionSensor.position.set(3, -4.3, -7);
    groupT.position.set(0, -3.5, -19.5);
    group3.scale.set(1, 1, 1);
    groupV.add(VisionSensor);
    groupT.add(TB, TR, TG, TY);

    VisionSensor.scale.set(0.3, 0.3, 0.3);

    scene.add(group1);
    scene.add(group2);
    scene.add(group3);
    scene.add(body);
    scene.add(Belt);
    scene.add(groupT);
    scene.add(groupV);

    this.loaded = true;
  }

  actionY(value) {
    const currentY = this.axes.yAxis.position.y;
    if (typeof value !== "undefined") {
      if (value.toFixed(2) < currentY.toFixed(2)) {
        this.axes.yAxis.position.y -= 0.05;
      } else if (value.toFixed(2) > currentY.toFixed(2)) {
        this.axes.yAxis.position.y += 0.05;
      }
    }
  }

  actionX(value) {
    const currentX = this.axes.xAxis2.rotation.y;
    if (typeof value !== "undefined") {
      if (value.toFixed(2) < currentX.toFixed(2)) {
        this.axes.xAxis.rotation.y += MathUtils.degToRad(1);
        this.axes.xAxis2.rotation.y += MathUtils.degToRad(-1);
      } else if (value.toFixed(2) > currentX.toFixed(2)) {
        this.axes.xAxis.rotation.y += MathUtils.degToRad(-1);
        this.axes.xAxis2.rotation.y += MathUtils.degToRad(1);
      }
    }
  }
}
