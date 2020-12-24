% Demonstration of proposed segmentation approach.

function segmentCloud(img_path) 

    addpath(genpath('./SegmentationToolbox/'));
    addpath('C:\Users\Hope\Desktop\TaiLieuHocTap\N4K1\ImageProcesing\SKY-CLOUD IMAGE SEGMENTATION\nighttime-imaging\SegmentationToolbox\SLIC');
    addpath(genpath('./scripts/'));


    % I = imread('./images/undist/2016-05-10-02-02-04-wahrsis3-undist.jpg')
    I = imread(img_path);
    % figure('Position', [400, 250, 200, 200]);
    % imshow(I);

    [color_ch]=color16Norm(I);
    inputRatio = color_ch.c14;
    % figure('Position', [400, 250, 200, 200]);
    % imshow(uint8(inputRatio));

    [quantBlock, slic_image, binary_image]=createSPImage(inputRatio);

    % imshow(slic_image)
    % figure('Position', [400, 250, 200, 200]);
    % imshow(uint8(quantBlock));


    % figure('Position', [400, 250, 200, 200]);
    % imshow(binary_image);

    outPath = './demo/output/';
    if (not(exist(outPath,'dir')))
        mkdir(outPath) 
    end
    original_path = strcat(outPath,'original_image.png');
    ratio_path = strcat(outPath,'ratio_image.png');
    quantblock_path = strcat(outPath,'quantblock_image.png');
    slic_path = strcat(outPath,'slic_image.png');
    binary_path = strcat(outPath,'binary_image.png');

    imwrite(I, original_path);
    imwrite(uint8(inputRatio), ratio_path);
    imwrite(uint8(quantBlock), quantblock_path);
    imwrite(slic_image, slic_path);
    imwrite(binary_image, binary_path);
end