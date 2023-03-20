var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
  var scene = new BABYLON.Scene(engine);

  // Adicione uma câmera para visualizar a cena
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    2,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // Adicione luzes à cena
  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

  // Carregue o modelo .obj
  BABYLON.SceneLoader.ImportMesh("", "js/", "3dmaquina1.obj", scene, function (newMeshes) {
    // O modelo é carregado como um grupo de malhas, então precisamos percorrer as malhas individuais
    for (var i = 0; i < newMeshes.length; i++) {
      // Faça algo com cada malha, por exemplo:
      newMeshes[i].material = new BABYLON.StandardMaterial("mat", scene);
      newMeshes[i].material.diffuseColor = new BABYLON.Color3(0.5, 0.5, 1);
    }
  });

  return scene;
};

var scene = createScene();

// Renderize a cena
engine.runRenderLoop(function() {
  scene.render();
});
