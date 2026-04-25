% Combined MATLAB Script for Portfolio
% This file combines OptimalNodes_JLG and its dependent functions.

%% Main Script: OptimalNodes_JLG
B2 = [0, 80];
B4 = [0, 40];
B6 = [0, 0];
D5 = [40, 20];
E2 = [60, 80];
E4 = [60, 40];
E6 = [60, 0];
F3 = [80, 60];
F5 = [80, 20];
G6 = [100, 0];
J3 = [160, 60];
MatJ3 = zeros(7,2) + J3;
forceapplied = [0;27*9.81]; %27 because we want it to fail between 25-30kgs
MatCoords = [D5; E2; E4; E6; F3; F5; G6];
MatNodes = ['D5'; 'E2'; 'E4'; 'E6'; 'F3'; 'F5'; 'G6'];

[L, theta] = lengthangle_JLG(MatCoords, MatJ3);

[forcemember] = forcecalc_JLG(theta,forceapplied);

[mincompression,location1] = mincompandlocation_JLG(forcemember);

[location2] = locatepair_JLG(location1);

[memberforce, magforce, memberstate] = memberforceandstate_JLG(location1,location2,forcemember);

[namenode,lengthmember] = nameandlength_JLG(location1,location2,MatNodes,L);

fprintf("\nThe optimal nodes are: \n%2s with member %2sJ3 of length %6.2fmm in %11s with a force of %6.2fN through it \n%2s with member %2sJ3 of length %6.2fmm in %11s with a force of %6.2fN through it\n\n", namenode(1), namenode(1), lengthmember(1), memberstate(1), magforce(1), namenode(2), namenode(2), lengthmember(2), memberstate(2), magforce(2))

%   Next for buckling and crushing and tensile failure
%   Slenderness ratio etc
%   Use Rankine failure criterion for brittle acrylic
%   (If we want to get spicy use Modified Mohr/Coulomb-Mohr(brittle))

%% Local Functions

function [r, theta] = lengthangle_JLG(x,y)
% Uses coordinates of points to give positive angle from horizontal (x axis) and length outputs
% with atan2 and pythagorean theorem

M = x - y;
r = zeros(size(M,1), 1);
theta = zeros(size(M,1), 1);
for i = 1:size(M,1)
    theta(i) = atan2(M(i, 1),M(i, 2)) + pi/2;
    r(i) = sqrt(M(i, 1)^2 + M(i, 2)^2);
end
end

function [forcemember] = forcecalc_JLG(theta,forceapplied)
% Creates a matrix of the force of each member pair, e.g. D5&D5, D5&E2,
% D5&E4..., G6&E2 etc
%   Creates zeros in zones of repeated pairs (e.g. D5&E2 and E2&E5) and
%   where the pair is with itself
%   Separates the forces into x and y components and solves the
%   simultaneous equation for the forces through the members

anglecomponent = [cos(theta), sin(theta)];
forcemember = zeros(size(anglecomponent,1), 2*size(anglecomponent,1));
for k = 1:size(anglecomponent,1)
    for j = 1:size(anglecomponent,1)
        if j > k
            compmat = [anglecomponent(k,1), anglecomponent(j,1); anglecomponent(k,2), anglecomponent(j,2)];
            W = compmat\forceapplied;
            forcemember(j,2*k-1:2*k) = W';
        else
            forcemember(j,2*k-1:2*k) = [0,0];
        end
    end    
end
end

function [mincompression,location] = mincompandlocation_JLG(forcemember)
% looks through forcemember and finds the minimum compression member
% uses the value to find the index values

[mincompression, location] = max(forcemember(forcemember < 0));   % max over negative entries
idxAll = find(forcemember < 0);
idx = idxAll(location);

[row,col] = ind2sub(size(forcemember), idx);
location = [row,col];
end

function [location2] = locatepair_JLG(location1)
% finds where the pair is in forcemember with simple problem solving
% each pair is in columns (1:2), (3:4), (5:6)...
% both are in the same row, so the column is either + or - 1 depending on
% location
location2 = zeros(1,2);
location2(1) = location1(1);

if mod(location1(2),2) ~= 0
    location2(2) = location1(2) + 1;
else
    location2(2) = location1(2) - 1;
end
end

function [memberforce,magforce,memberstate] = memberforceandstate_JLG(location1,location2,forcemember)
% allocates the forces to a separate matrix and declares whether they are
% in tension or compression (tension is +ve and compression is -ve force
% thorough it)
% Also gives the magnitude of the force

memberforce = zeros(1,2);
memberstate = strings(1,2);
memberforce(1) = forcemember(location1(1), location1(2));
memberforce(2) = forcemember(location1(1),location2(2));

if memberforce(1) > 0
    memberstate(1) = "tension";
else
    memberstate(1) = "compression";
end
if memberforce(2) > 0
        memberstate(2) = "tension";
else
    memberstate(2) = "compression";
end
magforce = abs(memberforce);
end

function [namenode,lengthmember] = nameandlength_JLG(location1,location2,MatNodes,L)
% Uses the allocations from before to give the nodes names and lengths from
% previous calculations

namenode = strings(1,2);
lengthmember = zeros(1,2);

if mod(location1(2),2) ~= 0
    namenode(2) = MatNodes(location1(1),:);
    lengthmember(2) = L(location1(1));
    namenode(1) = MatNodes(location2(2),:);
    lengthmember(1) = L(location2(2));
else
    namenode(2) = MatNodes(location1(2)/2,:);
    lengthmember(2) = L(location1(2)/2);
    namenode(1) = MatNodes(location1(1),:);
    lengthmember(1) = L(location1(1));
end
end
