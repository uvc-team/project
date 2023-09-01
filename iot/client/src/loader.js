import {
  Group,
  AxesHelper,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  MathUtils,
} from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

export default class Edukit {
  constructor() {
    this.loader = new FBXLoader();
    this.object = {};
    this.loaded = false;
    this.axes = {};
  }

  async fileload(scene) {
    const group = (this.object.group = new Group());
    const groupY = (this.axes.yAxis = new Group());
    const groupX = (this.axes.xAxis = new Group());
    const groupX2 = (this.axes.xAxis2 = new Group());

    const geometry = new BoxGeometry(3, 3, 3);
    const material = new MeshBasicMaterial({ color: "red" });
    const mesh = new Mesh(geometry, material);
    mesh.position.y = 3;
    // groupX.rotation.y = MathUtils.degToRad(-90);
    groupX2.position.x = 5;
    // groupX2.position.y = 10;
    // groupX2.rotation.y = MathUtils.degToRad(90);

    group.position.x = 10;

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

    mesh1.position.y = -1.5;
    // mesh1.position.x = 5;
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

    for (const [_, object] of Object.entries(this.object)) {
      object.scale.set(0.5, 0.5, 0.5);
      object.traverse(function (child) {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    groupX2.add(mesh1, mesh.clone(), new AxesHelper(7));
    groupX.add(mesh.clone(), mesh2, groupX2, new AxesHelper(7));
    groupY.add(groupX, mesh3);
    group.add(groupY, mesh4);
    scene.add(group);
    scene.add(body);

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
    // this.axes.xAxis.rotation.y = -value
    // this.axes.xAxis2.rotation.y = value
    if (value.toFixed(2) < currentX.toFixed(2)) {
      this.axes.xAxis.rotation.y += MathUtils.degToRad(1);
      this.axes.xAxis2.rotation.y += MathUtils.degToRad(-1);
    } else if (value.toFixed(2) > currentX.toFixed(2)) {
      this.axes.xAxis.rotation.y += MathUtils.degToRad(-1);
      this.axes.xAxis2.rotation.y += MathUtils.degToRad(1);
    }
  }
}
